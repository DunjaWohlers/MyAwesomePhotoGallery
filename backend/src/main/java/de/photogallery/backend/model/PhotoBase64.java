package de.photogallery.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;

@AllArgsConstructor
@Data
public class PhotoBase64 {
    @Id
    String id;
    String photo;
    String[] tags;
}
