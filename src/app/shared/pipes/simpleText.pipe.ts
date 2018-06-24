import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'simpleText'
})
export class SimpleTextPipe implements PipeTransform {

  constructor() {
  }

  transform(input: string): any {
    if (!input) {
      return input;
    }

    const lines = input.split('\n');

    let result = '';
    let listBuffer: string[] = [];
    for (let t = 0; t < lines.length; t++) {
      const line = lines[t].trim();

      // Check if buffer should be processed or the current line should be added to buffer
      if (listBuffer.length > 0) {
        if (line.startsWith('-')) {
          listBuffer.push(line.replace(/-\s*(.*)/, '$1'));
        } else {
          result = this.parseBuffer(result,  listBuffer);
          listBuffer = [];
        }
      } else {
        // Normal flow
        if (line.startsWith('-')) {
          listBuffer.push(line.replace(/-\s*(.*)/, '$1'));
        } else if (line.startsWith('titel:')) {
          result += line.replace(/titel:\s*(.*)/, '<h3>$1</h3>');
        } else {
          result += line + '<br>';
        }
      }
    }
    result = this.parseBuffer(result,  listBuffer);
    return result;
  }

  parseBuffer(result: string, listBuffer: string[]): string {
    if (listBuffer.length > 0) {
      // Process buffer
      result += '<ul>';
      for (let r = 0; r < listBuffer.length; r++) {
        result += '<li>' + listBuffer[r] + '</li>';
      }
      result += '</ul>';
    }
    return result;
  }
}
