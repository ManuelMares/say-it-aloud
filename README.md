# say-it-aloud!
This is a pnpm + vite + reactjs + ts + piper-tts version of Say-it-Aloud.
Recommended to use pnpm and a conda environment for piper-tts

# install
go to frontend and do pnpm install

## wsl installation
in wsl

install python
install git

create environment 
	python3 -m venv aloud
	source aloud/bin/activate


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