package de.photogallery.backend;

import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class PhotoService {

    @Autowired
    private PhotoRepo photoRepo;

    public Photo addPhoto(MultipartFile newPhoto) throws IOException {
        Photo photo = new Photo();
        photo.setNewPhoto(
                new Binary(BsonBinarySubType.BINARY, newPhoto.getBytes()));
        return photoRepo.save(photo);
    }
}
