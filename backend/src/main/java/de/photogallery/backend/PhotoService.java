package de.photogallery.backend;

import de.photogallery.backend.exceptions.ItemNotFoundException;
import de.photogallery.backend.model.Photo;
import de.photogallery.backend.model.PhotoBase64;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.Base64Utils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@RequiredArgsConstructor
@Service
public class PhotoService {
    private final PhotoRepo photoRepo;

    public List<PhotoBase64> getPhotos() {
        List<Photo> photos = photoRepo.findAll();
        List<PhotoBase64> photosBase64 = new ArrayList<>();
        photos.forEach(photo -> {
            String encodedString = Base64Utils.encodeToString(photo.getNewPhoto());
            PhotoBase64 newPhoto = new PhotoBase64(photo.getId(), encodedString, photo.getTags());
            photosBase64.add(newPhoto);
        });
        return photosBase64;
    }

    public Photo addPhoto(MultipartFile newPhoto, String tag) throws IOException {
        UUID uuid = UUID.randomUUID();
        String uuidAsString = uuid.toString();
        byte[] photoData = newPhoto.getBytes();
        String[] tags = new String[]{tag};
        Photo photo = new Photo(uuidAsString, photoData, tags);
        return photoRepo.save(photo);
    }

    public Photo updateProject(PhotoBase64 updatedPhoto) {
        byte[] photoData = Base64.getDecoder().decode(updatedPhoto.getPhoto());
        Photo photo = new Photo(updatedPhoto.getId(), photoData, updatedPhoto.getTags());
        return photoRepo.save(photo);
    }

    public void deletePhoto(String id) {
        if (photoRepo.existsById(id)) {
            photoRepo.deleteById(id);
        } else {
            throw new ItemNotFoundException(id);
        }
    }
}
