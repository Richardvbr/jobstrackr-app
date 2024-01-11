# JobsTrackr

## Project structure

Most of the project code lives in the /src directory and looks like this:

```bash
|
+-- components        # shared components used across the entire application
|
+-- context           # contexts
|
+-- features          # feature based modules
|
+-- hooks             # shared hooks used across the entire application
|
+-- lib               # re-exporting different libraries preconfigured for the application
|
+-- providers         # providers
|
+-- styles            # global configuration for styles
|
+-- routes            # routes and routing setup
|
+-- types             # base types used across the application
|
+-- utils             # shared utility functions
```

Feature folder structure:

```bash
src/features/some-feature
|
+-- api         # exported API request declarations and api hooks related to a specific feature
|
+-- assets      # assets folder can contain all the static files for a specific feature
|
+-- components  # components scoped to a specific feature
|
+-- hooks       # hooks scoped to a specific feature
|
+-- stores      # state stores for a specific feature
|
+-- types       # typescript types for TS specific feature domain
|
+-- utils       # utility functions for a specific feature
|
+-- index.ts    # entry point for the feature, serves as the public API of the given feature
```

## Tech stack

```bash
React
TypeScript
Supabase            # auth, postgres db
Zustand             # client-side state
React-query         # queries, mutations, server-side state
Tanstack-router     # client-side routing
SCSS modules        # styling
```
