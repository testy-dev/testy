FROM cypress/browsers:node12.16.2-chrome81-ff75

# avoid too many progress messages
# https://github.com/cypress-io/cypress/issues/1243
ENV CI=1

# should be root user
RUN echo "whoami: $(whoami)"
RUN npm config -g set user $(whoami)

# command "id" should print:
# uid=0(root) gid=0(root) groups=0(root)
# which means the current user is root
RUN id

# point Cypress at the /root/cache no matter what user account is used
# see https://on.cypress.io/caching
ENV CYPRESS_CACHE_FOLDER=/root/.cache/Cypress
RUN npm install -g "cypress@4.6.0"
RUN cypress verify

# Cypress cache and installed version
# should be in the root user's home folder
RUN cypress cache path
RUN cypress cache list
RUN cypress info

# give every user read access to the "/root" folder where the binary is cached
# we really only need to worry about the top folder, fortunately
RUN ls -la /root
RUN chmod 755 /root

# always grab the latest NPM and Yarn
# otherwise the base image might have old versions
RUN npm i -g yarn@latest
#    npm@latest

RUN echo  " node version:    $(node -v) \n" \
  "npm version:     $(npm -v) \n" \
  "yarn version:    $(yarn -v) \n" \
  "debian version:  $(cat /etc/debian_version) \n" \
  "user:            $(whoami) \n" \
  "chrome:          $(google-chrome --version || true) \n" \
  "firefox:         $(firefox --version || true) \n"

WORKDIR "/app"

ENTRYPOINT "yarn run concurrently -n server,browser --kill-others \"node /app/dist/server.js\" \"cypress run --browser chrome /app/dist/browser.js\""
