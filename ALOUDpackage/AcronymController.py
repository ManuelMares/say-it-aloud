import re
import json
import ALOUDpackage.settings as GLOBAL
import ALOUDpackage.File as FILE


#=====================================================================================================================================
#PUBLIC FUNCTIONS
#=====================================================================================================================================
def exists(acronym: str):
    """
        Indicates the existence of an acronym in the dictionary given an acronym word (not key)
        @param target
            An acronym object
        @return
            A boolean value indicating if the item exists
    """
    acronym["acronym"] = acronym["acronym"].lower()
    acronym["definition"] = acronym["definition"].lower()

    acronym_dict = open_acronym_dictionary()
    for value in acronym_dict.values():
        if acronym["acronym"] == value["acronym"]:
            return True
    
    return False

def edit(acronym):
    """
        Edits an acronym in the database.
    @param
        acronym - an acronym object
    @return
        A boolean value indicating the acronym was changed
    @exception
        Generic exception
    """
    acronym["acronym"] = acronym["acronym"].lower()
    acronym["definition"] = acronym["definition"].lower()


    #Replacing the acronym    
    acronym_dict = open_acronym_dictionary()
    acronym_dict[acronym['id']] = acronym

    #The stored file has to be a valid string
    acronym_dict = json.dumps(acronym_dict, indent=4)
    acronym_dict = str(acronym_dict)

    FILE.save_file_content(GLOBAL.ACRONYM_DICT_PATH, acronym_dict)

def add(acronym):
    """
        Adds an acronym
    @param
        acronym - an acronym object
    @return
        A boolean value indicating the acronym was added
    @exception
        Generic exception
    """
    acronym["acronym"] = acronym["acronym"].lower()
    acronym["definition"] = acronym["definition"].lower()


    if(exists(acronym)):
        return False

    acronym_dict = open_acronym_dictionary()
    
    acr_object = {acronym['id']: acronym}
    acronym_dict.update(acr_object)
    acronym_dict = json.dumps(acronym_dict, indent=4)
    FILE.save_file_content(GLOBAL.ACRONYM_DICT_PATH, acronym_dict)
    return True

def delete(acronym):
    """
        Deletes an acronym
    @param
        acronym - an acronym object
    @return
        A boolean value indicating the acronym was deleted
    @exception
        Generic exception
    """
    acronym["acronym"] = acronym["acronym"].lower()
    acronym["definition"] = acronym["definition"].lower()

    acronym_dict = open_acronym_dictionary()
    answer = acronym_dict.pop(acronym["id"])


    acronym_dict = json.dumps(acronym_dict, indent=4)
    FILE.save_file_content(GLOBAL.ACRONYM_DICT_PATH, acronym_dict)

    return answer


def search(target: str):
    """
    Returns an acronym object
    @param target
        A acronym word to look for
    @return
        An acronym object
    """
    target = target.lower()

    acronym_dict = open_acronym_dictionary()
    for value in acronym_dict.values():
        if target == value["acronym"]:
            return value["acronym"]
    
    return None

def define(target: str):
    """
    Returns the definition of an acronym
    @param target
        A acronym word to look for
    @return
        A string
    """
    target = target.lower()


    acronym_dict = open_acronym_dictionary()
    for value in acronym_dict.values():
        if target == value["acronym"]:
            return value["definition"]
    
    return None

def replace_acronyms(text: str):
    """
        Given a string, this function replaces all the acronyms for their definitions
        @param text
            The text where the acronyms will be replaced
        @return
            A string
    """
    # Python regex is simple and cannot exclude \word { and \word{ at the same time
    # This pattern detect all combination including { or not. 
    # In a further step those elements with { or \s{ will be filtered out
    p = re.compile(r'\\\w+\s*{*')

    #Replace acronyms
    try:
        matches = p.findall(text)
        #The regex included \word{ and \word {, which are Tones and have to be filtered out.
        #We also have to clean the string from white spaces
        acronyms = [match.replace("\n", "").strip() for match in matches if not (match.endswith("{") or match.endswith(" {"))]
        for acronym in acronyms:
            #When replacing, we need to ignore the scape character \, that's why [1:]
            text = text.replace(acronym, define(acronym[1:])+" ")
        return text
    except:
        print("Error (replace_acronyms): The given text contains undefined acronyms.")
        return None

#=====================================================================================================================================
#PRIVATE FUNCTIONS
#=====================================================================================================================================
def open_acronym_dictionary(): 
    """
        returns the acronym dictionary from memory
        @param acronym_path
            the path where the acronym file is located
        @return
            A dictionary structure
    """
    acronym_dict = None
    try:
        with open(GLOBAL.ACRONYM_DICT_PATH) as acronym_dict:
            acronym_dict =  json.loads(acronym_dict.read())
    except Exception as error:
        print("Error (_open_acronym_dictionary): Dictionary is empty")
    return acronym_dict
