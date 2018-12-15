import React from "react";
import CacheFactory from "./cacheFactory.js";

const cache = CacheFactory(sessionStorage);

export function getRepoData({ repo, user }) {
  const key = `${user}/${repo}`;
  if (cache.get(key)) return Promise.resolve(cache.get(key));

  return fetch(`https://api.github.com/repos/${user}/${repo}`)
    .then(res => res.json())
    .then(cache.getCacheSetter(key));
}

export function getStargazers({ repo, user }) {
  return getRepoData({ repo, user }).then(data => data.stargazers_count);
}

export const Icons = {
  star: `<svg class="octicon octicon-star v-align-text-bottom" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path></svg>`,
  repo: `<svg class="octicon octicon-repo" viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"></path></svg>`
};

export const StatusButtons = {
  GithubStars: ({ user, repo, targetId }) => {
    return getStargazers({ user, repo }).then(starCount => (

    ));
  }
};
