.PHONY: build

build: node_modules package.json
	node --harmony index.js local

prod: node_modules package.json
	node --harmony index.js prod

install:
	npm install

help:
	@echo "build - builds locally"
