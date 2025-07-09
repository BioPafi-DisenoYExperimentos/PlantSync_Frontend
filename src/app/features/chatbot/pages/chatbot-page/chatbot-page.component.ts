import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatInputComponent } from '../../components/chat-input/chat-input.component';
import { ChatDisplayComponent } from '../../components/chat-display/chat-display.component';

/**
 * ChatbotPageComponent is the main page that integrates the chat input and display.
 * It manages the list of messages exchanged between the user and the assistant.
 */
@Component({
  selector: 'app-chatbot-page',
  standalone: true,
  imports: [CommonModule, ChatInputComponent, ChatDisplayComponent],
  templateUrl: './chatbot-page.component.html',
  styleUrls: ['./chatbot-page.component.css']
})
export class ChatbotPageComponent {
  /**
   * Array that stores the conversation messages.
   * Each message has a role ('user' or 'assistant') and the text content.
   */
  messages: { role: 'user' | 'assistant', content: string }[] = [];

  /**
   * Adds a new user message to the conversation.
   * This method is triggered when the user submits a message via the input component.
   *
   * @param userMessage - The message string typed by the user.
   */
  handleUserMessage(userMessage: string): void {
    this.messages.push({ role: 'user', content: userMessage });
  }

  /**
   * Updates the conversation with the AI assistant's response.
   * If the last assistant message is a placeholder ("Thinking..."), it replaces it.
   * Otherwise, it adds the new assistant message.
   *
   * @param aiReply - The AI-generated response to be displayed.
   */
  handleAiResponse(aiReply: string): void {
    const lastMessage = this.messages[this.messages.length - 1];
    if (lastMessage?.role === 'assistant' && lastMessage.content === 'Pensando...') {
      lastMessage.content = aiReply;
    } else {
      this.messages.push({ role: 'assistant', content: aiReply });
    }
  }
}
