import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * ChatDisplayComponent is responsible for rendering the list of chat messages.
 * It receives the conversation as an input and displays each message with styling
 * based on the sender's role (user or assistant).
 */
@Component({
  selector: 'app-chat-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-display.component.html',
  styleUrls: ['./chat-display.component.css']
})
export class ChatDisplayComponent {
  /**
   * Input property that holds the list of messages in the chat.
   * Each message includes a role ('user' or 'assistant') and the message content.
   */
  @Input() messages: { role: 'user' | 'assistant', content: string }[] = [];
}
