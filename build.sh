#!/bin/bash

# BOB_VERSION environment variable is required
if [ -z "$BOB_VERSION" ]; then
  echo 'Please set the required environment variable for bob version to install'
  echo 'E.g. BOB_VERSION=2.0.0'
  exit 1
fi

# Add deno bin to PATH, just in case.
# This will be used both by the Deno installer (as per the default),
# and as the install location for bob
PATH="$HOME/.deno/bin:$PATH"

# Install Deno if not already installed
deno --version || curl -fsSL https://deno.land/x/install/install.sh | sh

# Install bob (will not overwrite existing installation)
deno install -A "https://deno.land/x/bob@v$BOB_VERSION/cli.ts"

# Force-build site
bob -f
