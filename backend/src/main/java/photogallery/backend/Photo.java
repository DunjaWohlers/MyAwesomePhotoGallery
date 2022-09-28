package photogallery.backend;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.bson.conversions.Bson;

@AllArgsConstructor
    @Data
    public class Photo {
        Bson photo;
    }
