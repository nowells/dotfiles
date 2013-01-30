install: install-vim install-bash install-virtualenvwrapper \
         install-terminal-settings install-tmux install-git \
				 install-python install-rvm install-powerline install-ipython \
				 install-config install-fonts

install-fonts:
	cp -f `pwd`/fonts/* ~/Library/Fonts

install-config:
	rm -rf ~/.config
	ln -s `pwd`/config ~/.config
	rm -f ~/.inputrc ~/.editrc
	ln -s `pwd`/config/inputrc ~/.inputrc
	ln -s `pwd`/config/editrc ~/.editrc

install-ipython:
	rm -rf ~/.ipython
	ln -s `pwd`/ipython ~/.ipython

install-rvm:
	rm -f ~/.rvmrc
	ln -s `pwd`/rvm/rvmrc ~/.rvmrc

install-python:
	rm -f ~/.pythonrc
	ln -s `pwd`/python/pythonrc ~/.pythonrc

install-powerline:
	git submodule update --init --recursive
	rm -rf ~/.powerline
	ln -s `pwd`/powerline ~/.powerline

install-vim:
	git submodule update --init --recursive
	rm -rf ~/.vim ~/.vimrc
	ln -s `pwd`/vim ~/.vim
	ln -s ~/.vim/vimrc ~/.vimrc

install-bash:
	rm -rf ~/.bashrc ~/.bashrc.d
	ln -sn `pwd`/bash/bashrc ~/.bashrc
	ln -sn `pwd`/bash/bash_profile ~/.bash_profile
	ln -sn `pwd`/bash ~/.bashrc.d
	
install-virtualenvwrapper:
	mkdir -p ~/.virtualenvs
	ln -sf `pwd`/virtualenvwrapper/* ~/.virtualenvs

dump-terminal-settings:
	cp ~/Library/Preferences/com.apple.Terminal.plist terminal
	plutil -convert xml1 terminal/com.apple.Terminal.plist

install-terminal-settings:
	cp ~/Library/Preferences/com.apple.Terminal.plist terminal/old-settings.bak
	cp terminal/com.apple.Terminal.plist ~/Library/Preferences
	@echo "Old terminal settings were saved in terminal folder"

install-git:
	rm -f ~/.gitconfig ~/.gitignore ~/.git_template
	ln -s `pwd`/git/gitconfig ~/.gitconfig
	ln -s `pwd`/git/gitignore ~/.gitignore
	ln -s `pwd`/git_template ~/.git_template

install-tmux:
	rm -f ~/.tmux.conf
	ln -s `pwd`/tmux/tmux.conf ~/.tmux.conf

install-brew:
	brew instal ack jmeter pyqt apple-gcc42 giflib mobile-shell gist git mysql r keychain bash brew-pip node reattach-to-user-namespace cairo gnu-sed redis gnupg libffi nss rhino gnupg2 openssl gnutls ctags p11-kit graphviz libmpc pango dos2unix pcre libtasn1 spidermonkey faad2 phantomjs sqlite fdupes ssed fftw gsl szip gtk+ tidy fontforge libxml2 pixman libyaml tig gawk hdf5 png2ico tmux gd icu4c unixodbc imagemagick postgresql vim gdk-pixbuf lzlib proctools wget intltool lzo wkhtmltopdf macvim gettext jbig2dec mad pstree memcached
	brew linkapps
