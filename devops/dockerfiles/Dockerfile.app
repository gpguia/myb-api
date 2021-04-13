# Set Image ARGS
ARG BASE=base

# Set base image
FROM $BASE AS builder

# set work directory
WORKDIR /app
# Copy dependencies & remove tmp folder
RUN cp -a /tmp/* .
# Variable to define the service to build
ARG SERVICE=myb
# Set env vars
ENV SERVICE=${SERVICE}
# Copy required config files
COPY apps/${SERVICE}/*.json apps/${SERVICE}/
# Copy source files
COPY apps/${SERVICE}/src apps/${SERVICE}/src/

# Expose app port
EXPOSE 3000

##  Environment ##
# Launch app

FROM builder as local
ENV NODE_ENV=development
CMD nest start $SERVICE --watch

FROM builder as dev
ENV NODE_ENV=production
CMD nest start $SERVICE

FROM builder as prod
ENV NODE_ENV=production
CMD nest start $SERVICE

FROM builder as seed
CMD nest start $SERVICE

FROM builder as patient
CMD nest start $SERVICE