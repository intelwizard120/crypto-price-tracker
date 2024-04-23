<div align="center">
<img src="public/icon-128.png" alt="logo"/>
<h1> Cryptocurrency-price-tracker<br/>React + Vite + TypeScript</h1>

![](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![](https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![](https://badges.aleen42.com/src/vitejs.svg)
![GitHub action badge](https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/actions/workflows/build-zip.yml/badge.svg)
<img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https://github.com/Jonghakseo/chrome-extension-boilerplate-react-viteFactions&count_bg=%23#222222&title_bg=%23#454545&title=😀&edge_flat=true" alt="hits"/>


> This project is listed in the [Awesome Vite](https://github.com/vitejs/awesome-vite)

</div>

## Table of Contents

- [Intro](#intro)
- [Features](#features)
- [Installation](#installation)
    - [Procedures](#procedures)
        - [Chrome](#chrome)
        - [Firefox](#firefox)
- [Add Style Library](#add-style-library)
    - [Twind](#twind)
    - [Chakra UI](#chakra-ui)
- [Pages](#pages)
- [Screenshots](#screenshots)
    - [NewTab](#newtab)
    - [Popup](#popup)
    - [Devtools](#devtools)
- [Examples](#examples)
- [Documents](#documents)

## Intro <a name="intro"></a>

This boilerplate is made for creating chrome extensions using React and Typescript.
> The focus was on improving the build speed and development experience with Vite.

## Features <a name="features"></a>

- [React 18](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Vite](https://vitejs.dev/)
- [SASS](https://sass-lang.com/)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
- [Husky](https://typicode.github.io/husky/get-started.html#automatic-recommended)
- [Commitlint](https://commitlint.js.org/#/guides-local-setup?id=install-commitlint)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary)
- [Chrome Extension Manifest Version 3](https://developer.chrome.com/docs/extensions/mv3/intro/)
- HRR(Hot Rebuild & Refresh/Reload)

## Installation <a name="installation"></a>

## Procedures: <a name="procedures"></a>

1. Clone this repository.
2. Change `extensionDescription` and `extensionName` in messages.json
3. Install pnpm globally: `npm install -g pnpm` (check your node version >= 16.6, recommended >= 18)
4. Run `pnpm install`

## And next, depending on the needs:

### For Chrome: <a name="chrome"></a>

1. Run:
    - Dev: `pnpm dev` or `npm run dev`
    - Prod: `pnpm build` or `npm run build`
2. Open in browser - `chrome://extensions`
3. Check - `Developer mode`
4. Find and Click - `Load unpacked extension`
5. Select - `dist` folder

### For Firefox: <a name="firefox"></a>

1. Run:
    - Dev: `pnpm dev:firefox` or `npm run dev:firefox`
    - Prod: `pnpm build:firefox` or `npm run build:firefox`
2. Open in browser - `about:debugging#/runtime/this-firefox`
3. Find and Click - `Load Temporary Add-on...`
4. Select - `manifest.json` from `dist` folder

### <i>Remember in firefox you add plugin in temporary mode, that's mean it's disappear after close browser, you must do it again, on next launch.</i>

## Add Style Library <a name="add-style-library"></a>

> IMPORTANT: If you DO NOT want to use css file in the content script, you need to delete the css file in your
> manifest.js

[Jonghakseo](https://nookpi.tistory.com/)
