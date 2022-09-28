package photogallery.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("photos/")
public class PhotoController {
    private final PhotoService photoService;

    @GetMapping()
    List<Photo> getPhotos() {
        return photoService.getPhotos();
    }

    @PostMapping()
    @ResponseStatus(code = HttpStatus.CREATED)
    public Photo addPhoto(@RequestBody Photo newPhoto) {
        return photoService.addPhoto(newPhoto);
    }
}
