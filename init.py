"""=====================================================================================================================================
eel_CRA.py

*   This file is the controller for the eel server
*   It exposes the public functions to the react components
*   GLOBAL VARIABLES are located at the settings file

*   To create python work, use the ALOUD package.
    use this file only to expose the necessary function. Works similar to the header files in C
=====================================================================================================================================
"""

import os
import platform
import random
import sys
import eel
import time
import json
import argparse

# Use this path only to import the ALOUD package
temp = sys.path
sys.path.insert(0, './frontend/src/')
import ALOUDpackage.settings            as ALOUD
import ALOUDpackage.AcronymController   as ALOUD_acronyms
import ALOUDpackage.ReactionsController as ALOUD_reactions  
import ALOUDpackage.Compiler            as ALOUD_compiler  
import ALOUDpackage.File                as ALOUD_FILE  
import ALOUDpackage.ATE_editor_settings as ALOUD_ATE_settings
sys.path.insert(0, temp)



# sys.path.insert(0, './src/')
# Use latest version of Eel from parent directory
sys.path.insert(1, '../../')

#global variables
# WINDOWS_ACRONYM_DICTIONARY_PATH = ".\src\Components\RightMenu\Acronym\AcronymDictionary.json"
# MAC_ACRONYM_DICTIONARY_PATH = "./src/Components/RightMenu/Acronym/AcronymDictionary.json"
# ACRONYM_DICTIONARY_NAME = "AcronymDictionary.json"


#==========================================================================================================================
#ACRONYMS==================================================================================================================
#==========================================================================================================================
@eel.expose     
def acronym_exists(target):             return ALOUD_acronyms.exists(target)
@eel.expose     
def acronym_edit(acronym):              return ALOUD_acronyms.edit(acronym)
@eel.expose     
def acronym_add(acronym):                return ALOUD_acronyms.add(acronym)
@eel.expose     
def acronym_delete(acronym):            return ALOUD_acronyms.delete(acronym)
@eel.expose     
def acronym_search(target):             return ALOUD_acronyms.search(target)
@eel.expose     
def acronym_define(target):             return ALOUD_acronyms.define(target)
@eel.expose     
def acronym_replace_acronyms(text):     return ALOUD_acronyms.replace_acronyms(text)


#==========================================================================================================================
#COMPILER==================================================================================================================
#==========================================================================================================================
@eel.expose     
def compiler_compile(text):             return ALOUD_compiler.compile(text)



#==========================================================================================================================
#FILES=====================================================================================================================
#==========================================================================================================================
@eel.expose
def read_folder(directory):                    return ALOUD_FILE.read_folder(directory)
@eel.expose
def remove_file(directory):                    return ALOUD_FILE.remove_file(directory)
@eel.expose
def remove_folder(directory):                  return ALOUD_FILE.remove_folder(directory)
@eel.expose
def read_file_content(file_path):              return ALOUD_FILE.read_file_content(file_path)
@eel.expose
def create_folder(name, directory):            return ALOUD_FILE.create_folder(name, directory)
@eel.expose
def rename_folder(newName, directory):         return ALOUD_FILE.rename_folder(newName, directory)
@eel.expose
def create_file(name, directory):              return ALOUD_FILE.create_file(name, directory)
@eel.expose
def rename_file(newName, directory):           return ALOUD_FILE.rename_file(newName, directory)
@eel.expose
def save_file_content(file_path, content):     return ALOUD_FILE.save_file_content(file_path, content)



#==========================================================================================================================
#REACTIONS=================================================================================================================
#==========================================================================================================================
@eel.expose
def exists(target: str):                return ALOUD_reactions.exists(target)
@eel.expose
def search(target: str):                return ALOUD_reactions.search(target)




#==========================================================================================================================
#ATE_SETTINGS==============================================================================================================
#==========================================================================================================================
@eel.expose
def ATE_settings_update(ATE_settings):                return ALOUD.ALOUD_ATE_settings(ATE_settings)




@eel.expose
def read_text(text:str):                
    return ALOUD_compiler.read(text)

"""======================================================================================================================"""
"""======================================================================================================================"""
"""======================================================================================================================"""
"""Eel configuration"""
def start_eel(args: str, develop: bool = False, browser: str = "edge"):
    """Start Eel with either production or development configuration."""
    if develop:
        directory = 'frontend/src'
        app = None
        page = {'port': 5173}
        eel_port = 5169
    else:
        directory = 'build'
        app = 'chrome-app'
        page = 'index.html'
        eel_port = 8080


    eel.init(directory, allowed_extensions=['.tsx', '.ts', '.jsx', '.js', '.html'])
    

    """The functions triggered here will be queued until the first connection is made, but won't be repeated on a page reload"""
    eel_kwargs = dict(
        host='localhost',
        port=eel_port,
        size=(1280, 800),
    )

    try:
        if browser == 'edge':
            eel.start(page, mode='edge', **eel_kwargs)
        else:
            eel.start(page, mode=app, **eel_kwargs)
    except EnvironmentError:
        raise



if __name__ == '__main__':
    import sys
    parser = argparse.ArgumentParser()
    parser.add_argument("--args", type=str, default='index.html', help="The argument for the Eel function")
    parser.add_argument("--develop", type=lambda x: (str(x).lower() == 'true'), default=False, help="Enable development mode (True or False)")
    parser.add_argument("--browser", type=str, default="edge", help="Browser to use (e.g., chrome, edge)")

    args = parser.parse_args()
    start_eel(args=args.args, develop=args.develop, browser=args.browser)


























#===============================================================
#===============================================================
# python -m pip install gtts
# pip install eel
# pip install pyttsx3
# pip install playsound




# from gtts import gTTS
# from playsound import playsound
# from tkinter import *
# import tkinter as tk
# import os

# #voice it
# def play():
#     e = entry.get()
#     obj = gTTS(text = e, lang = "en", slow=False)
#     obj.save("newVoice.mp3")
#     playsound("newVoice.mp3")

#     obj2 = gTTS(text = e, lang = "en", slow =True)
#     obj2.save("newVoice2.mp3")
#     playsound("newVoice2.mp3")



# # create root window
# root = Tk()
# root.title("Welcome Speech It!")
# mainframe = Tk.Frame(root, padding = "10 10 10 10")
# mainframe.grid(column = 0, row = 0, sticky = (N,W,E,S))
# root.columnconfigure(0, weight=1)
# root.rowconfigure(9, weight=1)

# frame1 = Frame(root, bg = "green", height = "150", width="800")
# frame1.pack(fill = X)


# frame2 = Frame(root, bg = "lightgreen", height = "500", width="800")
# frame2.pack(fill=X)


# #instructions
# instructions = Label(frame1, text = "Please introduce the text you want to speech")
# # instructions.config(font =("Courier", 14))
# instructions.place(x = 180, y = 70)

# #textbox
# entry = Entry(frame2, width = 45,
#               bd = 4, font = 14)
# entry.place(x = 130, y = 52)
# entry.insert(0, "")

# #buttons
# voiceIt = Button(frame2, text = "Voice it", command = play)
# voiceIt.place(x = 250, y = 130)




# root.mainloop()









