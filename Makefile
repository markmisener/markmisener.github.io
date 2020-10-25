SHELL := /bin/bash

.PHONY: run-local

run-local:
	bundle exec jekyll serve --watch
