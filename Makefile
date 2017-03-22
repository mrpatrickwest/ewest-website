.PHONY: build

build: node_modules package.json
	node --harmony index.js local

ewest: node_modules package.json
	node --harmony index.js ewest

orion: node_modules package.json
	node --harmony index.js orion

install:
	npm install

help:
	@echo "build - builds locally"
