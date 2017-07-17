NPM := $(shell which npm)
REACT := $(shell which react-native)

# - Build & Set Up

# Transpiles the TypeScript
build:
	$(NPM) run build
.PHONY: build

# Sets up the workspace (typically used after a fresh clone)
# - Installs dependencies and transpiles the TypeScript.
setup: dependencies
	$(MAKE) build
.PHONY: setup

# - Run

# Runs the Android app in the Emulator
run-android:
	$(REACT) run-android
.PHONY: run-android

# Runs the iOS app in the Simulator
run-ios:
	$(REACT) run-ios
.PHONY: run-ios

# Starts the react-native package server
start:
	$(NPM) start
.PHONY: start

# - Dependencies

# Installs the dependencies
dependencies:
ifndef NPM
	$(error "Couldn't find `npm` installed.")
endif
	@$(MAKE) install-react install-npm-packages

# Installs the JS packages
install-npm-packages:
ifndef NPM
else
	$(NPM) install
endif

# Installs the react-native-cli if not already installed
install-react:
ifndef REACT
	$(NPM) install -g react-native-cli
endif
