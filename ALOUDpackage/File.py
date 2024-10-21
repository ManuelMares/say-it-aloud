import ALOUDpackage.settings as GLOBAL
import os





def read_folder(directory):
    """
    Given a directory from the os, this function returns a dictionary
    that contains the txt files and folders

    @param new_path
        The directory to read in the system

    @return
        A dictionary of the form
            {
                "folder": string[],
                "txt": string[]
            }
    """
    try:
        folders = []
        texts = []
        for element in os.scandir(directory):
            #opens those txt files that are not OS-related
            if os.path.splitext(element)[1] == ".txt" and "$" not in element.name:
                texts.append((element.name, element.path))
            # Avoids listing OS-related files
            if element.is_dir() and "$" not in element.name:
                folders.append((element.name, element.path))


        folders_and_txts_dict = {
            "folder": folders,
            "txt": texts
        }
        return folders_and_txts_dict
    except Exception as e:
        print("Error reading directory content:", e)
        return None

def create_folder(name, directory):
    """
    Given a directory from the os, this function creates a folder

    @param directory
        The directory to read in the system

    @param name
        The name of the directory to create

    @return
        A boolean value indicating if the folder was created
    """
    if name == "":
        return False

    try:
        os.chdir(directory)
        if not os.path.exists(name):
            os.makedirs(name)
            return True
        return False
    except Exception as e:
        print("Error creating folder:", e)
        return False

def rename_folder(newName, directory):
    """
    This function renames a given folder

    @param directory
        The directory to read in the system

    @param newName
        The new name of the folder

    @return
        A boolean value indicating if the folder was renamed
    """

    try:
        os.rename(directory, newName)
        return True
    except Exception as e:
        print("Error renaming folder:", e)
        return False


def create_file(name, directory):
    """
    Given a directory from the os, this function creates a file

    @param directory
        The directory to read in the system

    @param name
        The name of the file to create

    @return
        A boolean value indicating if the folder was creates
    """
    try:
        if name == "":
            return False

        os.chdir(directory)
        if not os.path.isfile(name):
            print(os.path.abspath(os.getcwd()), name)
            f2 = open(name, 'x')
            return True
        return False
    except Exception as e:
        print("Error creating file:", e)
        return False

def rename_file(newName, directory):
    """
    This function renames a given file

    @param directory
        The directory to read in the system

    @param newName
        The new name of the folder
    """

    try:
        os.rename(directory, newName)
        return True
    except Exception as e:
        print("Error renaming file:", e)
        return False

def remove_file(directory):
    """
    This function deletes a file

    @param directory
        The directory to delete from the system
    """
    print("deleting", directory)
    try:
        os.remove(directory)
        return True
    except Exception as e:
        print("Error removing file:", e)
        return False

def remove_folder(directory):
    """
    This function deletes a folder

    @param directory
        The directory to delete from the system
    """
    print("deleting", directory)
    try:
        os.rmdir(directory)
        return True
    except Exception as e:
        print("Error removing folder:", e)
        return False

def read_file_content(file_path):
    """
        Reads the file content of a .txt file and returns it as a string

        @param file_path
            The path of the file to read
        @return
            A string with the content of the file
        @exception
            Generic
    """
    try:
        with open(file_path, 'r') as file:
            content = file.read()
            return content
    except Exception as e:
        print("Error reading file:", e)
        return None


def save_file_content(file_path, content):
    """
        Writes the file content of a .txt file

        @param file_path
            The path of the file to write
        @param content
            The content to write in file_path
        @return
            A boolean value indicating if that the file was written
        @exception
            Generic
    """
    try:
        with open(file_path, 'w') as file:
            file.write(content)
            return True
    except Exception as e:
        print("Error saving file:", e)
        return False

