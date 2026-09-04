<?php

namespace Drupal\nws_misc\Plugin\Block;

use Drupal\Core\Block\Annotation\Block;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\File\FileUrlGeneratorInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\node\NodeInterface;
use Drupal\paragraphs\ParagraphInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides a map block.
 *
 * @Block(
 *   id = "nws_misc_map",
 *   admin_label = @Translation("NWS Misc map"),
 * )
 */
class MapBlock extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   * The entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * The file URL generator.
   *
   * @var \Drupal\Core\File\FileUrlGeneratorInterface
   */
  protected $fileUrlGenerator;

  /**
   * Constructs a new MapBlock instance.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity_type_manager, FileUrlGeneratorInterface $file_url_generator) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->entityTypeManager = $entity_type_manager;
    $this->fileUrlGenerator = $file_url_generator;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('entity_type.manager'),
      $container->get('file_url_generator')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function defaultConfiguration() {
    return [
      'node_id' => 68,
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function blockForm($form, FormStateInterface $form_state) {
    $form['node_id'] = [
      '#type' => 'number',
      '#title' => $this->t('Node ID'),
      '#default_value' => $this->configuration['node_id'] ?? 68,
      '#min' => 1,
      '#required' => TRUE,
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function blockSubmit($form, FormStateInterface $form_state) {
    $this->configuration['node_id'] = (int) $form_state->getValue('node_id');
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    $node_id = (int) ($this->configuration['node_id'] ?? 68);
    $node = $this->entityTypeManager->getStorage('node')->load($node_id);

    if (!$node instanceof NodeInterface || !$node->hasField('field_content_map')) {
      return ['#markup' => ''];
    }

    $items = [];
    $paragraphs = $node->get('field_content_map')->referencedEntities();

    foreach ($paragraphs as $paragraph) {
      if (!$paragraph instanceof ParagraphInterface) {
        continue;
      }

      $item = [
        'lat' => $paragraph->get('field_lat')->value,
        'lon' => $paragraph->get('field_lon')->value,
        'name' => $paragraph->get('field_name')->value,
        'link' => '',
        'logo' => '',
        'children_map' => [],
      ];

      if (!$paragraph->get('field_link')->isEmpty()) {
        $item['link'] = $this->fileUrlGenerator->generateAbsoluteString($paragraph->get('field_link')->uri);
      }

      if (!$paragraph->get('field_logo_m')->isEmpty() && $paragraph->get('field_logo_m')->entity) {
        $item['logo'] = $this->fileUrlGenerator->generateAbsoluteString($paragraph->get('field_logo_m')->entity->getFileUri());
      }

      $child_items = [];
      foreach ($paragraph->get('field_children_map')->referencedEntities() as $child) {
        if (!$child instanceof ParagraphInterface) {
          continue;
        }

        $child_item = [
          'lat' => $child->get('field_lat')->value,
          'lon' => $child->get('field_lon')->value,
          'name' => $child->get('field_name')->value,
          'link' => '',
          'logo' => '',
        ];

        if (!$child->get('field_link')->isEmpty()) {
          $child_item['link'] = $this->fileUrlGenerator->generateAbsoluteString($child->get('field_link')->uri);
        }

        if (!$child->get('field_logo_m')->isEmpty() && $child->get('field_logo_m')->entity) {
          $child_item['logo'] = $this->fileUrlGenerator->generateAbsoluteString($child->get('field_logo_m')->entity->getFileUri());
        }

        $child_items[] = $child_item;
      }

      $item['children_map'] = $child_items;
      $items[] = $item;
    }

    return [
      '#theme' => 'map_block',
      '#items' => $items,
      '#cache' => [
        'tags' => $node->getCacheTags(),
      ],
      '#attached' => [
        'library' => ['nws_misc/map'],
        'drupalSettings' => [
          'nws_misc' => [
            'mapItems' => $items,
          ],
        ],
      ],
    ];
  }

}
