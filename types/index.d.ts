import {Request, Response} from 'node-fetch'
import type {Octokit} from '@octokit/rest'
import type {Action, Loader} from '@remix-run/data'

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (node?: Element) => Promise<void>
      }
    }
  }
}

type MdxPage = {
  slug: string
  code: string
  frontmatter: {
    title: string
    description: string
  }
}

type PostListing = {
  slug: string
  frontmatter: {
    title: string
    description: string
    published: number
  }
}

type Post = PostListing & {
  code: string
}

type LoaderContext = {
  req: Request
  res: Response
  octokit: Octokit
}

type KCDLoader<
  Params extends Record<string, string> = Record<string, string>
> = (
  args: Omit<Parameters<Loader>['0'], 'context' | 'params'> & {
    context: LoaderContext
    params: Params
  },
) => ReturnType<Loader>

type KCDAction<
  Params extends Record<string, string> = Record<string, string>
> = (
  args: Omit<Parameters<Action>['0'], 'context' | 'params'> & {
    context: LoaderContext
    params: Params
  },
) => ReturnType<Action>

type GitHubFile = {path: string; content: string}
type PostIndexFile = GitHubFile & {slug: string}

export {
  MdxPage,
  Post,
  PostListing,
  KCDLoader,
  KCDAction,
  GitHubFile,
  PostIndexFile,
}