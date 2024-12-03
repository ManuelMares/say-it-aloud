# say-it-aloud!
This is a pnpm + vite + reactjs + ts + piper-tts version of Say-it-Aloud.
Recommended to use pnpm and a conda environment for piper-tts

# install
go to frontend and do pnpm install

## wsl installation
in wsl

install python
install git
install sudo apt-get install wslu


create environment with mini conda
install piper -> pip install piper-tts
aloud
if conda is not being activated, do 'conda init zsh' first


install nvm -> node package manager
	curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
load nvm
	export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
install node
	nvm install node
install pnpm
	 curl -fsSL https://get.pnpm.io/install.sh | sh -
install vite
	pnpm add -D vite






# Develop
To run Say-it-Aloud!, you need an Eel server, and a vite server. Use a new console to run each:
## activate environment
use venv or conda or something else
## Eel server
    python init.py --develop=True --browser=edge
Notice that depending on your alias, you might need to user 'py', 'python3'
or other commands to start this server
    --develop = True/False
    --browser = edge/chrome
Notice that edge consumes less resources than chrome when running the app
## vite server
In power shell 
    cd ./frontend; pnpm run dev
In bash
    cd ./frontend && pnpm run dev

When updating the backend (Python scripts), it is necessary to restart the Eel server.
When updating the interface, the changes will show up inmediately, unless the modification
affects the way a backend is retrieved/displayed. In such case the pnpm might close on its own.
A simple restart will be sufficient to continue.


# Ports
frontend -> 5173
backend -> 5169
both in development

# changing ports in development
to change the backend port, 
    change the code in init.py for development (eel_port variable)
    Change eel port in eel.set_host in app.tsx
    Change eel port in index.html in frontend
To change frontend port
    adjust vite new port
    change page = {'port': 5173} in init.py


# docker build images
docker build -t aloud-backend .
    cd frontend
docker build -t aloud-frontend .

# Run docker
docker run -it -p 5169:5169 --name aloud_backend aloud-backend
in a second terminal
    cd frontend
    docker run -it -p 5173:5173 --name aloud-frontend aloud-frontend