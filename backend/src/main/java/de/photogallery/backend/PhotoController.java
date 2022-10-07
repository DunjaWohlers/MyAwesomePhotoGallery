package de.photogallery.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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

    @PostMapping(value = "", consumes = {"multipart/form-data"})
    @ResponseStatus(code = HttpStatus.CREATED)
    @ResponseBody
    public Photo addPhoto(
            @RequestPart("photo") MultipartFile photo,
            @RequestPart("tag") String tag) throws IOException {
        return photoService.addPhoto(photo, tag);
    }
}


//     @Test
//public void givenRequestPartAndRequestParam_whenPost_thenReturns200OK() throws Exception {
//    mockMvc.perform(multipart("/requestparam/employee")
//      .file(A_FILE)
//      .param("name", "testname"))
//      .andExpect(status().isOk());
//}