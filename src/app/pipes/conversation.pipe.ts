import { Pipe, PipeTransform } from '@angular/core';
import { Message } from '../models/Message';

@Pipe({
  name: 'conversation'
})
export class ConversationPipe implements PipeTransform {

  transform(messages: Message[], search: string): Message[] {
    if (!search) {
      return messages;
    }

    const searchTerm = search.toLowerCase().trim();

    return messages.filter(message =>
      message.content?.toLowerCase().includes(searchTerm)
    );
  }

}
