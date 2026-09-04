<?php

$finder = PhpCsFixer\Finder::create()
    ->in([
        'web/modules/custom',
        'web/themes/custom',
    ])
    ->exclude([
        'core',
        'modules/contrib',
        'themes/contrib',
    ]);

return (new PhpCsFixer\Config())
    ->setFinder($finder);
