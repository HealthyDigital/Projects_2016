import os, sys
from PIL import Image
from resizeimage import resizeimage


names = list(sys.argv[2:])
n = 0

for filename in os.listdir(sys.argv[1]):
	if(filename[0] != '.'):
		with Image.open(sys.argv[1] + '/' + filename) as image:
			name = names[n]
			thumb = resizeimage.resize_cover(image, [200, 150])
			thumb.save(name + '-thumb.jpg', image.format)
			full = resizeimage.resize_cover(image, [1024, 768])
			full.save(name + '-full.jpg', image.format)
		n+=1

		print(n, name, 'Completed')