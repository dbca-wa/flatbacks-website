<?php

namespace Drupal\nws_misc\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;
use Drupal\user\Entity\User;
use Drupal\Component\Serialization\Json;

class map4Block extends BlockBase
{
    public function build()
    {
        $node = \Drupal\node\Entity\Node::load(68);
        $data = $node->field_content_map->getValue();
        $i = 0;
        foreach ($data as $element) {
            $p = \Drupal\paragraphs\Entity\Paragraph::load($element['target_id']);
            $output[$i]['lat'] = $p->field_lat->value;
            $output[$i]['lon'] = $p->field_lon->value;
            $output[$i]['name'] = $p->field_name->value;
            $output[$i]['link'] = \Drupal::service('file_url_generator')->generateAbsoluteString($p->field_link->uri);
            $output[$i]['logo'] = \Drupal::service('file_url_generator')->generateAbsoluteString($p->field_logo_m->entity->getFileUri());

            $children_map = $p->field_children_map->getValue();
            $j = 0;
            foreach ($children_map as $element1) {
                $p1 = \Drupal\paragraphs\Entity\Paragraph::load($element1['target_id']);
                $output[$i]['children_map'][$j]['lat'] = $p1->field_lat->value;
                $output[$i]['children_map'][$j]['lon'] = $p1->field_lon->value;
                $output[$i]['children_map'][$j]['name'] = $p1->field_name->value;
                $output[$i]['children_map'][$j]['link'] = \Drupal::service('file_url_generator')->generateAbsoluteString($p1->field_link->uri);
                $output[$i]['children_map'][$j]['logo'] = \Drupal::service('file_url_generator')->generateAbsoluteString($p1->field_logo_m->entity->getFileUri());
                $j++;
            }
            $i++;
        }

        return [
            '#theme' => 'map_block',
            '#items' => $output,
            '#cache' => ['max-age' => 0],
            '#attached' => [
                'library' => [
                ],
            ],
        ];
    }
}
