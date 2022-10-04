package de.photogallery.backend;

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

    public List<PhotoInBase64> getPhotos() {
        List<Photo> photos = photoRepo.findAll();
        List<PhotoInBase64> photosBase64 = new ArrayList<>();
        photos.forEach(photo -> {
            String encodedString = Base64Utils.encodeToString(photo.newPhoto);
            PhotoInBase64 newPhoto = new PhotoInBase64(photo.id, encodedString);
            photosBase64.add(newPhoto);
        });
        return photosBase64;
    }

    public Photo addPhoto(MultipartFile newPhoto) throws IOException {
        UUID uuid = UUID.randomUUID();
        String uuidAsString = uuid.toString();
        byte[] photoData = newPhoto.getBytes();
        Photo photo = new Photo(uuidAsString, photoData);
        return photoRepo.save(photo);
    }
}
