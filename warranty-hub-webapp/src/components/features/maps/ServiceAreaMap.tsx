import React, { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useServiceCenterService } from '@/services/service-center/hooks/useServiceCenterService';
import { IGeoFenceData } from '@/services/service-center/types/ServiceContracts';
import { useGlobalStore } from '@/lib/store/globalStore';

// Access token should be in environment variables
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

interface ServiceAreaMapProps {
  serviceCenterId: string;
  initialGeoJson?: GeoJSON.FeatureCollection | null;
  isEditable?: boolean;
  onSave?: (geoJson: GeoJSON.FeatureCollection) => Promise<void>;
  className?: string;
}

export const ServiceAreaMap: React.FC<ServiceAreaMapProps> = ({
  serviceCenterId,
  initialGeoJson,
  isEditable = false,
  onSave,
  className = "h-[500px] w-full rounded-lg shadow-sm border border-gray-200"
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const draw = useRef<MapboxDraw | null>(null);
  
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const { updateServiceArea } = useServiceCenterService();
  const { addToast } = useGlobalStore();

  // Initialize Map
  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.5, 40], // Default center, should ideally come from Service Center address
      zoom: 9,
    });

    map.current.on('load', () => {
      setIsMapLoaded(true);
      
      // Initialize Draw Control if editable
      if (isEditable) {
        draw.current = new MapboxDraw({
          displayControlsDefault: false,
          controls: {
            polygon: true,
            trash: true
          },
          defaultMode: 'simple_select'
        });
        
        if (map.current) {
          map.current.addControl(draw.current);
        }
      }

      // Load initial data if present
      if (initialGeoJson && map.current) {
        if (isEditable && draw.current) {
          draw.current.set(initialGeoJson);
        } else {
          // View-only mode: Add source and layer directly
          map.current.addSource('service-area', {
            type: 'geojson',
            data: initialGeoJson
          });
          
          map.current.addLayer({
            id: 'service-area-fill',
            type: 'fill',
            source: 'service-area',
            paint: {
              'fill-color': '#0080ff',
              'fill-opacity': 0.4
            }
          });
          
          map.current.addLayer({
            id: 'service-area-outline',
            type: 'line',
            source: 'service-area',
            paint: {
              'line-color': '#0080ff',
              'line-width': 2
            }
          });

          // Fit bounds
          const bounds = new mapboxgl.LngLatBounds();
          initialGeoJson.features.forEach((feature) => {
            if (feature.geometry.type === 'Polygon') {
              (feature.geometry.coordinates[0] as number[][]).forEach((coord) => {
                bounds.extend(coord as [number, number]);
              });
            }
          });
          if (!bounds.isEmpty()) {
            map.current.fitBounds(bounds, { padding: 40 });
          }
        }
      }
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [initialGeoJson, isEditable]);

  // Handle Save
  const handleSave = useCallback(async () => {
    if (!draw.current) return;

    try {
      setIsSaving(true);
      const data = draw.current.getAll();

      if (data.features.length === 0) {
        addToast({ type: 'warning', message: 'Please draw a service area polygon first.' });
        return;
      }

      // Basic validation: Ensure it's a closed loop
      // MapboxDraw handles most topology, but we check empty states
      
      const payload: IGeoFenceData = {
        serviceCenterId,
        geoJson: data,
        postalCodes: [] // Would be calculated on backend or separate input
      };

      // Call prop callback if provided, otherwise use service directly
      if (onSave) {
        await onSave(data);
      } else {
        await updateServiceArea(payload);
      }
      
      addToast({ type: 'success', message: 'Service area updated successfully.' });

    } catch (error) {
      console.error('Failed to save service area:', error);
      addToast({ type: 'error', message: 'Failed to save service area.' });
    } finally {
      setIsSaving(false);
    }
  }, [serviceCenterId, onSave, updateServiceArea, addToast]);

  const handleReset = useCallback(() => {
    if (draw.current) {
      draw.current.deleteAll();
      if (initialGeoJson) {
        draw.current.set(initialGeoJson);
      }
    }
  }, [initialGeoJson]);

  return (
    <div className="flex flex-col gap-4">
      {/* Map Container */}
      <div ref={mapContainer} className={`relative ${className}`}>
        {!isMapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg z-10">
            <span className="text-gray-500 animate-pulse">Loading Map...</span>
          </div>
        )}
      </div>

      {/* Controls */}
      {isEditable && (
        <div className="flex justify-end gap-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
           <button
            onClick={handleReset}
            disabled={isSaving || !isMapLoaded}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            Reset
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving || !isMapLoaded}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <svg className="w-4 h-4 mr-2 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Saving...
              </>
            ) : (
              'Save Service Area'
            )}
          </button>
        </div>
      )}
    </div>
  );
};