import { Component } from '@angular/core';
import { MessageService } from 'src/app/core/services/message/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
  constructor(private messageService: MessageService) {}

  getMessages(): string[] {
    return this.messageService.getMessages();
  }

  clearMessages(): void {
    this.messageService.clearMessage();
  }
}
