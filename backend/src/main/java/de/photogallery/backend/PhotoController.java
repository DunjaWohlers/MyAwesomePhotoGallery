package de.photogallery.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
@RequestMapping("photos/")
public class PhotoController {
    private final PhotoService photoService;

    @PostMapping("")
    public Photo addPhoto(@RequestParam("newPhoto") MultipartFile newPhoto)
            throws IOException {
        return photoService.addPhoto(newPhoto);
    }
}
