package photogallery.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class PhotoService {

    private final PhotoRepo photoRepo;

    public List<Photo> getPhotos() {
        return photoRepo.findAll();
    }

    public Photo addPhoto(Photo newPhoto) {
        return photoRepo.save(newPhoto);
    }
}
