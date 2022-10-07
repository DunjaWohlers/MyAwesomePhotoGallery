package de.photogallery.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.Base64Utils;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.Part;
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

    public Photo addPhoto(MultipartFile newPhoto, String tag) throws IOException {
        UUID uuid = UUID.randomUUID();
        String uuidAsString = uuid.toString();
        byte[] photoData = newPhoto.getBytes();
        String[] tags = new String[]{tag};
        Photo photo = new Photo(uuidAsString, photoData, tags);
        return photoRepo.save(photo);
    }
}
