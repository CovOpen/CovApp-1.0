APP_VERSION = latest
APP_NAME = covapp
DOCKER_REGISTRY ?= alp-snapshots.hpsgc.de
DOCKER_IMAGE=$(DOCKER_REGISTRY)/$(APP_NAME)
CONTAINER_NAME=$(APP_NAME)

docker-build db:    ## Build Docker image
	docker build \
		-t $(DOCKER_IMAGE):$(APP_VERSION) \
		-f build/Dockerfile \
		.

docker-run dr:      ## Run app in Docker. Configure connection to a DB using CDS_USERDATA_DB_HOST and CDS_USERDATA_DB_PORT
	docker run --name $(CONTAINER_NAME) -t -d \
		-p 8080:8080 \
		$(DOCKER_IMAGE):$(APP_VERSION)

clean:              ## Remove compiled binary, versioned chart and docker containers
	-docker rm -f $(CONTAINER_NAME)

restart: clean db dr
