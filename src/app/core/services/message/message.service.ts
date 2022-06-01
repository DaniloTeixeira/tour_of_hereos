import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private message: string[] = [];

  addMessage(message: string): void {
    this.message.push(message);
  }

  clearMessage(): void {
    this.message = [];
  }

  getMessages(): string[] {
    return this.message;
  }
}
