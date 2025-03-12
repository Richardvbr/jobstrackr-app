# JobsTrackr

## Project structure

Most of the project code lives in the /src directory and looks like this:

```bash
|
+-- components        # components
|
+-- context           # contexts
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
+-- stores            # state stores
|
+-- styles            # css variables, globals
|
+-- types             # base types used across the application
|
+-- utils             # shared utility functions
```

## Tech stack

```bash
React
TypeScript
Supabase            # auth, postgres db
Zustand             # client-side state
React-query         # queries, mutations, server-side state
React-router        # client-side routing
SCSS modules        # styling
```
