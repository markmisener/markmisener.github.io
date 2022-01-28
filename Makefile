SHELL := /bin/bash

.PHONY: install run-local run-local-drafts

install:
	bundle install

run-local:
	bundle exec jekyll serve --watch

run-local-drafts:
	bundle exec jekyll serve --watch --drafts
