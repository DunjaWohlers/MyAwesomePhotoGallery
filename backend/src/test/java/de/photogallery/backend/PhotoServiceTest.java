package de.photogallery.backend;

import de.photogallery.backend.exceptions.ItemNotFoundException;
import de.photogallery.backend.model.Photo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;

import static org.mockito.Mockito.*;
import static org.mockito.Mockito.verify;

public class PhotoServiceTest {

    private final PhotoRepo testPhotoRepo = mock(PhotoRepo.class);
    private final PhotoService testPhotoService = new PhotoService(testPhotoRepo);
    private final String[] tags = new String[]{"Lviv", "cars"};
    private final byte[] byteArray = new byte[]{0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00};
    Photo testPhoto = new Photo("01236-abc-789", byteArray, tags);

    MockMultipartFile multipartFile = new MockMultipartFile("file", "photo.txt", MediaType.TEXT_PLAIN_VALUE,
            "People on street in Lviv".getBytes());



    @Test
    void addProjectTest() throws IOException {
        when(testPhotoRepo.save(any(Photo.class))).thenReturn(testPhoto);
        Photo actual = testPhotoService.addPhoto(multipartFile, "street life");
        Assertions.assertEquals(testPhoto, actual);
    }

    @Test
    void deleteProject() {
        when(testPhotoRepo.existsById(testPhoto.getId())).thenReturn(true);
        doNothing().when(testPhotoRepo).deleteById(testPhoto.getId());
        testPhotoService.deletePhoto(testPhoto.getId());
        verify(testPhotoRepo).deleteById(testPhoto.getId());
    }

    @Test
    void deleteNotExistingCoworker() {
        when(testPhotoRepo.existsById(testPhoto.getId())).thenReturn(false);
        String id = testPhoto.getId();
        try {
            testPhotoService.deletePhoto(id);
            Assertions.fail("Expected exception was not thrown");
        } catch (ItemNotFoundException ignored) {
        }
    }
}
