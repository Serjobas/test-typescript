## What are the problems of the codebase? What kind of implementations did you see in the code base that ou did now like? How would you improve it?

I didn't like the massive usage of memoization in the project. I think that's better to start to optimize the project, once it should be optimized, and in particular places where it's really important. 
`Premature optimization is the root of all evil. (c)`

The approach for project architecture, I would prefer the feature-slice (atomic design) approach for storing, and creating components, since it allows you to divide the features of the project into atomic reusable components that are easier to maintain as the project grows. Current file structure `components, api, utils` eventually turns into a trash heap in which it is very difficult to navigate.

Contexts for storing the application state are also not a good thing, due to the frequent high-level re-renderer and the lack of optimizations. If we start writing optimization for context, then in the end we will be writing our own state manager, Instead of using a ready-made.

Adding pre-commit hooks also would be great for project's codebase quality.

Otherwise, it looks good except for minor implementations of some components
