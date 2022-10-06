package de.photogallery.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("photos/")
public class PhotoController {
    private final PhotoService photoService;

    @GetMapping("")
    List<PhotoInBase64> getPhotos() {
        return photoService.getPhotos();
    }

    @PostMapping("")
    public Photo addPhoto(@RequestParam("newPhoto") MultipartFile newPhoto)
            throws IOException {
        return photoService.addPhoto(newPhoto);
    }
}
