package de.photogallery.backend;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;

@AllArgsConstructor
@Data
public class PhotoInBase64 {
    @Id
    String id;
    String photo;
}
