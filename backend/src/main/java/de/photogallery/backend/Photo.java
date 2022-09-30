package de.photogallery.backend;

import org.bson.types.Binary;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "photo")
public class Photo {
    private Binary newPhoto;

    public void setNewPhoto(Binary newPhoto) {
        this.newPhoto = newPhoto;
    }
}