from PIL import Image
import os

def analayseImage(path):
    im = Image.open(path)
    pix = im.load()

    package_pixel_color = pix[50,50] 
    background_pixel_color = pix[3, 3]

    def isPackageReadyForPickup(pixel):
        if pixel == (0, 133, 71):
            return True
        return False

            
    def isDeliveryTeamBrenda(pixel):
        if pixel == (242, 121, 48):
            return True
        return False

    return isDeliveryTeamBrenda(background_pixel_color) and isPackageReadyForPickup(package_pixel_color)

def searchPackage(top_dir):
    for directory in os.listdir(top_dir):
        for subdirectory in os.listdir(os.path.join(top_dir, directory)):
            for subsubdirectory in os.listdir(os.path.join(top_dir, directory, subdirectory)):
                for file in os.listdir(os.path.join(top_dir, directory, subdirectory, subsubdirectory)):
                        if(analayseImage(os.path.join(top_dir, directory, subdirectory, subsubdirectory, file))):
                            return os.path.join(top_dir, directory, subdirectory, subsubdirectory, file)

print(searchPackage("packets"))


