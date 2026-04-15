---
navigation.title: 'Nuxt Plugins'
title: Nuxt Plugins
description: Nuxt 플러그인을 사용할 때의 모범 사례입니다.
---

Nuxt의 플러그인을 사용하면 애플리케이션에 추가 기능을 확장할 수 있습니다. 하지만 잘못 사용하면 성능 병목이 생길 수 있습니다. 이 가이드는 Nuxt 플러그인을 최적화하기 위한 모범 사례를 설명합니다.

## 비용이 큰 플러그인 설정 피하기 %{#avoid-costly-plugin-setup}%

플러그인 수가 많으면 성능 문제가 발생할 수 있으며, 특히 비용이 큰 연산이 필요하거나 초기화에 너무 오래 걸리는 경우 그렇습니다. 플러그인은 hydration 단계에서 실행되므로 비효율적인 설정은 렌더링을 막고 사용자 경험을 저하시킬 수 있습니다.

## 가능하면 Composition 사용하기 %{#use-composition-whenever-possible}%

가능하면 플러그인보다 composition을 우선하세요. Vue와 마찬가지로 많은 유틸리티와 컴포저블은 플러그인 없이도 직접 사용할 수 있습니다. 이렇게 하면 프로젝트를 가볍게 유지하고 유지보수성을 높일 수 있습니다.

## `async`라면 `parallel` 활성화하기 %{#if-async-enable-parallel}%

기본적으로 모든 플러그인은 동기적으로 로드됩니다.
비동기 플러그인을 정의할 때 `parallel: true`를 설정하면 여러 플러그인이 동시에 로드되어 차단 작업을 방지하고 성능을 향상할 수 있습니다.
