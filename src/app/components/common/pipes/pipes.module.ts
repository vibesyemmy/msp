import { OrderBy } from './order-by.pipe';
import { InboxCountPipe } from './inbox-count.pipe';
import { NgModule } from '@angular/core';
import { ConfirmationCountPipe } from './confirmation-count.pipe';
import { TimeAgoPipe } from './time-ago.pipe';
@NgModule({
  declarations: [InboxCountPipe, ConfirmationCountPipe, OrderBy, TimeAgoPipe],
  exports:[InboxCountPipe,ConfirmationCountPipe, OrderBy, TimeAgoPipe]
})
export class PipesModule {

}