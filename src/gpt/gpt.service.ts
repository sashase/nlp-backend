import { Injectable } from '@nestjs/common'
import OpenAI from 'openai'
import { ProcessPostDto } from './dtos'
import { PostMetadata } from './interfaces'

@Injectable()
export class GptService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })
  }

  private openai: OpenAI

  async processPost(post: ProcessPostDto): Promise<PostMetadata> {
    try {
      const result = await this.openai.chat.completions.create({
        messages: [
          { role: 'user', content: `Define tags and writing mood of following article, respond in format: "tag1, tag2, tag3 ,...tagn | writing-mood". available writing mood options - Informative, Entertaining, Persuasive, Inspirational, Opinionated, Investigative, Instructive, Conversational. Title: ${post.title}, Content: ${post.content}` }
        ],
        model: 'gpt-3.5-turbo',
      }).then(result => Promise.resolve(result.choices[0].message.content))

      const [tagsString, moodString] = result.split(' | ')

      if (!tagsString || !moodString) return null

      const tags: string[] = tagsString.split(/\s*,\s*/).map(tag => tag.toLowerCase())
      const mood = moodString.toLowerCase()

      return {
        tags,
        mood
      }
    }
    catch (e) {
      console.log(e)
    }
  }
}
