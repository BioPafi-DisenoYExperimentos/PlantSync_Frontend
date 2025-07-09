import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiService } from '../../services/ai.service';

/**
 * ChatInputComponent provides the input field for the user to send messages
 * and handles communication with the AI service.
 */
@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent {
  /** Stores the current input text from the user. */
  userInput: string = '';

  /** Indicates whether the component is waiting for a response from the AI. */
  loading: boolean = false;

  /**
   * Emits the message entered by the user.
   * Listened to by the parent component to add the message to the conversation.
   */
  @Output() sendUserMessage = new EventEmitter<string>();

  /**
   * Emits the AI-generated response or a placeholder message ("Thinking...").
   * Used to update the conversation in the parent component.
   */
  @Output() updateAiResponse = new EventEmitter<string>();

  /**
   * Injects the AI service responsible for querying the backend.
   * @param aiService - Service used to send the user question and get a reply from the AI.
   */
  constructor(private aiService: AiService) {}

  /**
   * Sends the user's message and triggers the AI response flow.
   * Validates input, emits events, sets loading state, and handles API response.
   */
  sendMessage(): void {
    if (!this.userInput.trim()) return;

    const question = this.userInput;
    this.loading = true;

    // Emit the user's message to be displayed immediately
    this.sendUserMessage.emit(question);

    // Emit placeholder while waiting for AI response
    this.updateAiResponse.emit('Pensando...');

    // Call AI service and handle response
    this.aiService.askQuestion(question).subscribe({
      next: (response) => {
        const aiReply = response.choices[0].message.content;
        this.updateAiResponse.emit(aiReply);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error querying AI:', err);
        this.updateAiResponse.emit('Unable to get a response (error 429).');
        this.loading = false;
      }
    });

    // Clear the input field
    this.userInput = '';
  }
}
