import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * AiService handles communication with the external AI chat API.
 * It sends user questions and receives AI-generated responses.
 */
@Injectable({
  providedIn: 'root'
})
export class AiService {
  /** Endpoint URL for the AI API */
  private apiUrl = 'https://api-key-ia.onrender.com/api/chat';

  /**
   * Injects the HttpClient for making HTTP requests.
   * @param http - Angular HttpClient for API calls
   */
  constructor(private http: HttpClient) {}

  /**
   * Sends a question to the AI API and returns its response.
   *
   * @param question - The user's message or prompt to send to the AI
   * @returns Observable emitting the AI's response payload
   */
  askQuestion(question: string): Observable<any> {
    return this.http.post(this.apiUrl, { question });
  }
}
