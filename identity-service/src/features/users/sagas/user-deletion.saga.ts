import { Injectable, Logger } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { LogoutCommand } from '../../auth/application/commands/logout.command';

// Event defined in Level 2/3 context (implied by US-118/GDPR requirements)
// Since explicit event file isn't in the list, we define the signature we expect to handle
// to ensure type safety within this file.
export class UserDeletionRequestedEvent {
  constructor(public readonly userId: string) {}
}

export class UserAnonymizedEvent {
  constructor(public readonly userId: string) {}
}

@Injectable()
export class UserDeletionSaga {
  private readonly logger = new Logger(UserDeletionSaga.name);

  /**
   * Orchestrates the user deletion/anonymization process (US-118).
   * When a UserDeletionRequestedEvent is emitted (e.g. from a Scheduled Job or API),
   * this saga ensures the user is immediately logged out (tokens revoked).
   * 
   * Future expansion: Dispatch AnonymizeUserCommand after Logout.
   */
  @Saga()
  userDeletionRequested = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserDeletionRequestedEvent),
      mergeMap((event) => {
        this.logger.log(`User deletion saga started for user: ${event.userId}`);
        
        // Step 1: Force Logout / Revoke Tokens immediately
        // This ensures the user cannot take further actions while deletion processes
        return of(new LogoutCommand(event.userId)).pipe(
          map(() => {
            this.logger.log(`Token revocation command dispatched for user: ${event.userId}`);
            // In a full implementation, we would map to the next step: AnonymizeUserCommand
            // Since that command isn't in the provided dependency list, we terminate the stream here
            // or return null if allowed, but strict typing requires ICommand.
            // Returning the command passes it to the CommandBus.
            return new LogoutCommand(event.userId); 
          }),
          catchError((error) => {
            this.logger.error(
              `Error in user deletion saga for user ${event.userId}: ${error.message}`,
              error.stack
            );
            // Return null or a compensation command in case of failure
            return of(null); 
          })
        );
      })
    );
  }
}