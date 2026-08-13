# 개인 블로그 프런트엔드

Spring Boot API를 사용하는 개인 블로그의 Next.js 프런트엔드다. 
공개 사용자는 로그인 없이 게시글을 조회하고, 관리자(작성자 본인)는 로그인 후 게시글과 카테고리를 관리한다. 
MVP부터 구현해 점진적으로 배포하는 것이 목표다.

## 기술 스택

- Next.js 16.3.0 (App Router)
- React 19.2.8, React Compiler
- TypeScript 5 (strict mode)
- Tailwind CSS 4
- shadcn/ui 4 (Base UI, Nova)
- npm

## 책임 경계

백엔드 기능을 Next.js Route Handler나 Server Action에 중복 구현하지 않는다.
